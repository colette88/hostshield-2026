import { spawn } from 'node:child_process';
const supplied=process.argv.slice(2);const args=['dev','--hostname','0.0.0.0'];
for(let i=0;i<supplied.length;i++){if(supplied[i]==='--host'){args[2]=supplied[++i];}else if(supplied[i]==='--strictPort'){continue;}else{args.push(supplied[i]);}}
const child=spawn(process.execPath,['node_modules/next/dist/bin/next',...args],{stdio:'inherit'});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code??1));
