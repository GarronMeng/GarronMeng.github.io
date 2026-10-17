/**
 * Optional upstream 3DCodeVerse harness adapter.
 * Generates an ISOLATED scene candidate. Never imports code into the game.
 *
 * npm run diorama:generate -- --dry-run
 * npm run diorama:generate -- --image /absolute/path/reference.jpg --rounds 2
 */
import {spawnSync} from 'node:child_process';
import {existsSync,readFileSync,realpathSync} from 'node:fs';
import {homedir} from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const promptFile=path.join(here,'room-spec.md');
const cli=process.env.THREEDCODE_BIN||'3dcode';
const argv=process.argv.slice(2);
let image,rounds,dryRun=false;
for(let i=0;i<argv.length;i++){
 const flag=argv[i];
 if(flag==='--image'){image=argv[++i];if(!image)throw Error('--image requires a local reference image path');}
 else if(flag==='--rounds'){rounds=argv[++i];if(!rounds||!/^\d+$/.test(rounds)||Number(rounds)<1||Number(rounds)>8)throw Error('--rounds must be between 1 and 8');}
 else if(flag==='--dry-run')dryRun=true;
 else throw Error(`Unknown argument: ${flag}`);
}
if(image&&!existsSync(image))throw Error(`Reference image not found: ${image}`);
const runsDir=path.resolve(process.env.THREEDCODE_RUNS_DIR||path.join(homedir(),'.3dcodeverse-runs','jinwan-youtao'));
const repoRoot=path.resolve(here,'../../../..');
if(runsDir===repoRoot||runsDir.startsWith(repoRoot+path.sep))throw Error('Generated runs must live outside the game source repository.');
const probe=spawnSync(cli,['make','--help'],{encoding:'utf8',shell:false});
if(probe.error){
 console.error('3DCodeVerse CLI is missing. Install the upstream harness separately (tools/3dcodeverse/README.md).');
 console.error(String(probe.error));process.exit(2);
}
if(probe.status!==0){console.error(probe.stderr||probe.stdout);process.exit(probe.status??2);}
const help=probe.stdout+'\n'+probe.stderr;
const prompt=readFileSync(promptFile,'utf8');
const args=[
 'make',prompt,'--track','scene','--language','scene_threejs',
 '--runs-dir',runsDir,
 '--dim','width=4.7','--dim','depth=3.1','--dim','height=2.38',
 '--must','King bed opposite media work counter; keep entrance and aisle traversable',
 '--must','Distinct rear and side cutaway wall nodes; no sofa bed in ordinary King room'
];
if(image){
 if(!/--image\b/.test(help))throw Error('Installed 3dcode make does not advertise --image. Inspect its current reference-image option.');
 args.push('--image',realpathSync(image));
}
if(rounds){
 if(!/--rounds\b/.test(help))throw Error('Installed 3dcode make does not advertise --rounds. Inspect its current refinement options.');
 args.push('--rounds',rounds);
}
if(dryRun)args.push('--no-run');
console.log('Isolated 3DCodeVerse scene candidate: no game source, save, or published preview is changed.');
console.log(`Run directory: ${runsDir}`);
console.log(`Track: scene / Language: scene_threejs / Image: ${image?'local file':'none'} / Dry run: ${dryRun}`);
const run=spawnSync(cli,args,{stdio:'inherit',shell:false});
if(run.error){console.error(run.error);process.exit(2);}
process.exit(run.status??2);
