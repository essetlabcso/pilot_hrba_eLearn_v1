import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  describeBaseRevision,
  isResumeDiagnosticCorrelationId,
  sendResumeDiagnosticCheckpoint,
} from '../src/integration/resumeDiagnostics.ts';

const COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
const PORTAL_ORIGIN = 'https://pilot-dec-cso.vercel.app';
const CORRELATION_ID = '123e4567-e89b-42d3-a456-426614174000';

test('HRBA diagnostic relay emits only the approved safe checkpoint fields', (t) => {
  const posted = [];
  const parent = {
    postMessage(message, targetOrigin) {
      posted.push({ message, targetOrigin });
    },
  };
  globalThis.window = { parent };
  t.after(() => {
    delete globalThis.window;
  });

  const diagnostic = {
    stageCode: 'HRBA-3',
    timestamp: '2026-08-10T12:00:00.000Z',
    courseSlug: COURSE_SLUG,
    currentModuleId: 'module_01_hrba_foundations',
    currentScreenId: 'M1-PLAYER-00',
    baseRevision: describeBaseRevision('2026-08-10T11:00:00.000Z'),
    result: 'PASS',
    correlationId: CORRELATION_ID,
  };
  assert.equal(sendResumeDiagnosticCheckpoint({
    courseSlug: COURSE_SLUG,
    embed: 'portal',
    launchToken: 'not-emitted',
    portalOrigin: PORTAL_ORIGIN,
  }, diagnostic), true);

  assert.equal(posted.length, 1);
  assert.equal(posted[0].targetOrigin, PORTAL_ORIGIN);
  assert.deepEqual(posted[0].message.diagnostic, diagnostic);
  const serialized = JSON.stringify(posted[0].message);
  for (const prohibited of [
    'learnerStateKey', 'launchToken', 'resumeState', 'answer', 'reflection',
    'email', 'cookie', 'session', 'password',
  ]) {
    assert.equal(serialized.includes(prohibited), false, `Unexpected field: ${prohibited}`);
  }
});

test('RESUME-8 checkpoints cover all four HRBA stages with one correlation contract', async () => {
  const appSource = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const bridgeSource = await readFile(
    new URL('../src/integration/hubProgress.ts', import.meta.url),
    'utf8',
  );
  assert.equal(appSource.includes("stageCode: 'HRBA-1'"), true);
  assert.equal(bridgeSource.includes("stageCode: 'HRBA-2'"), true);
  assert.equal(bridgeSource.includes("stageCode: 'HRBA-3'"), true);
  assert.equal(appSource.includes("stageCode: 'HRBA-4'"), true);
  assert.equal(isResumeDiagnosticCorrelationId(CORRELATION_ID), true);
  assert.equal(isResumeDiagnosticCorrelationId('not-a-correlation-id'), false);
});
