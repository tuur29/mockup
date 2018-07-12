import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../providers/electron.service';


@Component({
  selector: 'app-git',
  templateUrl: './git.component.html',
  styleUrls: ['./git.component.scss']
})
export class GitComponent implements OnInit {
  
  gitoutput: string;

  constructor(
    public electron: ElectronService,
  ) { }

  ngOnInit() {
  }

  async testGit(gitpath:string, path: string) {
    process.env.LOCAL_GIT_DIRECTORY = gitpath;

    const result = await this.electron.GitProcess.exec([ 'status' ], path);
    if (result.exitCode === 0) {
      // do some things with the output
      const output = result.stdout
      this.gitoutput = output;
    } else {
      // error handling
      const error = result.stderr
      console.error(error);
      this.gitoutput = error;
    }
    
  }

}
