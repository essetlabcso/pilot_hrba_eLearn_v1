import { ConceptIntroductionTemplate } from '../design-system/templates';

export default function Module2RightsHoldersStaticConceptScreen() {
  return (
    <section className="cso-screen-template">
      <div className="cso-screen-template__header">
        <h1 className="cso-screen-template__title">
          Rights-Holders as People With Rights, Voice, and Claims
        </h1>
      </div>
      <ConceptIntroductionTemplate
        eyebrow="Module 2 - Rights-holders"
        screenTitle="Seeing Rights-Holders Clearly"
        conceptTitle="Rights-holders, not a vague community label"
        summary="Broad labels can hide differences in access, voice, risk, responsibilities, and ways of being reached."
        keyMessageTitle="Practice takeaway"
        keyMessage="Naming rights-holders clearly supports fairer outreach, participation, accessibility, information, and accountability."
      >
        <p>
          Rights-holders are people affected by an issue who have rights, voice,
          and claims.
        </p>
        <p>
          In everyday CSO work, those rights may involve information, access,
          voice, inclusion, responsibility, and response.
        </p>
        <p>
          Naming rights-holders clearly helps keep outreach, participation,
          accessibility, information sharing, and accountability focused on the
          people whose rights are at stake.
        </p>
      </ConceptIntroductionTemplate>
    </section>
  );
}
