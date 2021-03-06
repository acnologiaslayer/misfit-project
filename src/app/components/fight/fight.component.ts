import { Component, OnInit } from '@angular/core';
import { GithubService } from '../../services/github.service'
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {

  profile1:string;
  profile2:string;

  proData1:any;
  proData2:any;

  total1:number;
  total2:number;

  constructor(private git:GithubService, private data:DataService) { }

  ngOnInit() {
  	this.data.current1.subscribe(res => {
  		this.profile1 = res; 
  		this.setProfileOne();
  	});
	this.data.current2.subscribe(res => {
		this.profile2 = res; 
		this.setProfileTwo();
	});
  }

  setProfileOne(){
  	this.git.getProfile(this.profile1).subscribe(res => {
  		if(!res.message){
  			this.proData1 = res;
  			this.git.getStars(this.profile1).subscribe(res => {
  				this.proData1.stars = res.length;
  			});	
  			this.git.getRepos(this.profile1).subscribe(res => {
  				this.proData1.repoCount = res.length
  				this.proData1.forkCount = 0;
  				res.forEach((repo) => {
  					this.proData1.forkCount = this.proData1.forkCount + repo.forks;
  				})
  				this.total1 = this.proData1.repoCount * 5 + this.proData1.followers * 3 + this.proData1.following * -2 + this.proData1.stars + this.proData1.forkCount * 3;
  			});
  		}
  	});
  }
  setProfileTwo(){
  	this.git.getProfile(this.profile2).subscribe(res => {
  		if(!res.message){
	  		this.proData2 = res;
	  		this.git.getStars(this.profile2).subscribe(res => {
	  			this.proData2.stars = res.length;
	  		});
	  		this.git.getRepos(this.profile2).subscribe(res => {
  				this.proData2.repoCount = res.length
  				this.proData2.forkCount = 0;
  				res.forEach((repo) => {
  					this.proData2.forkCount = this.proData2.forkCount + repo.forks;
  				})
  				this.total2 = this.proData2.repoCount * 5 + this.proData2.followers * 3 + this.proData2.following * -2 + this.proData2.stars + this.proData2.forkCount * 3;
  			});
  		}
  	});
  }

}
