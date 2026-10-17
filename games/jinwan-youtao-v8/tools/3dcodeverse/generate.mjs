/**
 * Optional upstream 3DCodeVerse harness adapter.
 * Generates an ISOLATED scene candidate. Never imports code into the game.
 *
 * npm run diorama:generate
 * npm run diorama:generate -- --image /absolute/path/reference.jpg --rounds 2
 */
import {spawnSync} from 'node:child_process';
import {existsSync,readFileSync,realpathSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const here=path.dirname(fileURLToPath(import.meta.url));
const promptFile=path.join(here,'room-spec.md');
const cli=process.env.THREEDCODE_BIN||'3dcode';
const argv=process.argv.slice(2);
let image,rounds;
for(let i=0;i<argv.length;i++){
 const flag=argv[i];
 if(flag==='--image'){image=argv[++i];if(!image)throw Error('--image requires a local reference image path');}
 else if(flag==='--rounds'){rounds=argv[++i];if(!rounds||!/^\d+$/.test(rounds)||Number(rounds)<1||Number(rounds)>8)throw Error('--rounds must be between 1 and 8');}
 else throw Error(`Unknown argument: ${flag}`);
}
if(image&&!existsSync(image))throw Error(`Reference image not found: ${image}`);
const probe=spawnSync(cli,['make','--help'],{encoding:'utf8',shell:false});
if(probe.error){
 console.error('3DCodeVerse CLI is missing. Follow tools/3dcodeverse/README.md to install it separately.');
 console.error(String(probe.error));process.exit(2);
}
if(probe.status!==0){console.error(probe.stderr||probe.stdout);process.exit(probe.status??2);}
const help=probe.stdout+'\n'+probe.stderr;
const prompt=readFileSync(promptFile,'utf8');
const args=['make',prompt,'--track','scene','--language','scene_threejs'];
if(image){
 if(!/--image\b/.test(help))throw Error('Installed 3dcode make does not advertise --image. Run 3dcode make --help and use its current reference-image option.');
 args.push('--image',realpathSync(image));
}
if(rounds){
 if(!/--rounds\b/.test(help))throw Error('Installed 3dcode make does not advertise --rounds. Run 3dcode make --help to inspect revision-specific options.');
 args.push('--rounds',rounds);
}
console.log('Starting an isolated 3DCodeVerse scene run. No game files are changed.');
console.log(`Track: scene / Language: scene_threejs / Image: ${image?'local file':'none'}`);
const run=spawnSync(cli,args,{stdio:'inherit',shell:false});
if(run.error){console.error(run.error);process.exit(2);}
process.exit(run.status??2);
