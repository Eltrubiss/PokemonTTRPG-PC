const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const formsPath = path.join(root, 'lib/pokemon/forms.js');
const dataPath = path.join(root, 'data/generated/pokemon.json');

const formsFile = fs.readFileSync(formsPath, 'utf8');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const temporaryForms = new Set([
  'mega',
  'mega-x',
  'mega-y',
  'mega-z',
  'primal',
  'gmax',
  'totem',
  'totem-alola',
  'totem-aliado'
]);
const genderForms = new Set(['male', 'female']);
const mutableForms = new Set(['shield', 'blade', 'standard', 'zen', 'galar-standard', 'galar-zen']);
const switchForms = new Set([
  'altered',
  'origin',
  'land',
  'sky',
  'heat',
  'wash',
  'frost',
  'fan',
  'mow',
  'attack',
  'defense',
  'speed',
  'ordinary',
  'resolute',
  'aria',
  'pirouette',
  'black',
  'white',
  'incarnate',
  'therian'
]);

const speciesRules = {};

for (const entry of data) {
  const forms = entry.formas || {};
  const formSlugs = Object.keys(forms).filter((slug) => slug !== 'normal');
  if (!formSlugs.length) continue;

  const species = entry.slug;
  let rule = null;

  if (formSlugs.some((slug) => temporaryForms.has(slug))) {
    rule = { type: 'temporary', forms: ['normal', ...formSlugs] };
  } else if (formSlugs.some((slug) => genderForms.has(slug)) || ['frillish', 'jellicent', 'pyroar', 'meowstic', 'oinkologne'].includes(species)) {
    const hasMale = formSlugs.includes('male');
    const hasFemale = formSlugs.includes('female');

    if (hasMale && hasFemale) {
      rule = { type: 'determined', by: 'gender', forms: { M: 'normal', F: 'female' } };
    } else if (hasMale && !hasFemale) {
      rule = { type: 'determined', by: 'gender', forms: { M: 'male', F: 'normal' } };
    } else if (!hasMale && hasFemale) {
      rule = { type: 'determined', by: 'gender', forms: { M: 'normal', F: 'female' } };
    }
  } else if (formSlugs.some((slug) => mutableForms.has(slug)) || ['darmanitan', 'minior', 'morpeko', 'palafin', 'wishiwashi'].includes(species)) {
    rule = { type: 'mutable', default: 'normal', forms: ['normal', ...formSlugs] };
  } else if (formSlugs.some((slug) => switchForms.has(slug)) || ['rotom', 'giratina', 'shaymin', 'meloetta', 'keldeo', 'kyurem', 'castform', 'tornadus', 'thundurus', 'landorus'].includes(species)) {
    rule = { type: 'switch', default: 'normal', forms: ['normal', ...formSlugs] };
  } else {
    rule = { type: 'choice', forms: ['normal', ...formSlugs] };
  }

  speciesRules[species] = rule;
}

const sortedSpecies = Object.keys(speciesRules).sort();
const entries = sortedSpecies.map((species) => {
  const rule = speciesRules[species];
  const formatted = JSON.stringify(rule, null, 4).replace(/\n/g, '\n        ');
  return `    ${species}: ${formatted},`;
}).join('\n');

const block = `const SPECIES_FORM_RULES = {\n\n${entries}\n\n};`;
const updated = formsFile.replace(/const SPECIES_FORM_RULES = \{[\s\S]*?\n\};\n\nexport function hasForm/, `${block}\n\nexport function hasForm`);

fs.writeFileSync(formsPath, updated, 'utf8');
console.log(`Updated ${formsPath} with ${sortedSpecies.length} species rules.`);
