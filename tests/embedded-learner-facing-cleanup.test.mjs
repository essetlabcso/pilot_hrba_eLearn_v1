import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { HRBA_COURSE_MODULES } from '../src/data/hrbaCourseModules.ts';

const platformShell = readFileSync('src/components/platform/PlatformShell.tsx', 'utf8');
const courseRoadmap = readFileSync('src/components/platform/CourseRoadmap.tsx', 'utf8');
const playerShell = readFileSync('src/components/player/CoursePlayerShell.tsx', 'utf8');

const progressNotice =
  'Your progress saves automatically. Pass the final assessment with a score of 80% or higher to earn your certificate.';

test('portal mode removes duplicate HRBA chrome and the destructive reset utility', () => {
  assert.match(platformShell, /!portalModeActive && \(\s*<header/);
  assert.match(platformShell, /!portalModeActive && \(\s*<button/);
  assert.match(platformShell, /platform-container--portal/);
  assert.match(platformShell, /CSO Learning Hub/);
  assert.match(platformShell, /Reset Course Progress/);
});

test('learner-facing platform copy is streamlined and non-technical', () => {
  assert.doesNotMatch(platformShell, /Flagship Course Enrolled/i);
  assert.doesNotMatch(platformShell, /specialized training program/i);
  assert.doesNotMatch(courseRoadmap, />Five-module learning pathway</i);
  assert.doesNotMatch(platformShell, /browser progress|saved locally|portal mode|local-only storage|external databases|strict compliance/i);
  assert.match(platformShell, /This training program guides local civil society organization team members through five practical modules on safe HRBA learning, foundations, project design, implementation, and MEAL\./);
  assert.match(platformShell, new RegExp(progressNotice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(playerShell, new RegExp(progressNotice.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(platformShell, /&copy; 2026 CSO Learning Hub &middot; Human Rights-Based Approach \(HRBA\) eLearning Course/);
});

test('module cards retain their sequence and have no repeated subtitle-description copy', () => {
  assert.equal(HRBA_COURSE_MODULES.length, 6);
  assert.deepEqual(
    HRBA_COURSE_MODULES.map(({ itemLabel }) => itemLabel),
    ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5', 'Final Assessment'],
  );

  const duplicateDescriptions = HRBA_COURSE_MODULES
    .filter(({ subtitle, description }) => subtitle?.trim() === description.trim())
    .map(({ moduleId }) => moduleId);
  assert.deepEqual(duplicateDescriptions, []);
});
