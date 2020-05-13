import React from 'react';
import SearchElements from './css/Search.module.css'
import {NavLink} from 'react-router-dom'
import defaultBear from '../pictures/defaultBear.jpg'
import * as axios from 'axios'

const Search = (props) => {
	  //debugger;
	  let pages = [];
	  let pagesCount = Math.ceil(props.totalCount/props.pageListCount);
		  
	  for(let i = 0;i!=pagesCount;i++){
		  pages[i] = i;
	  }
	  let pagesFilter = pages.map((el,index)=>{
		  if (index==0) return ''
		  else return <span className = {props.currentPage == index?SearchElements.currentPage:SearchElements.notCurrentPage} onClick = {() => {props.onPageChanged(el,props)}}>{el + " "}</span>
	  })
	  
	  let users = props.searchPage.users.map((u) => {
		
				let followVariable = u.followed == true? "unfollow":"follow";
			
				let followFunc = () =>{
					if(!u.followed){
						axios.post('https://social-network.samuraijs.com/api/1.0/follow/' + u.id,{},{
							withCredentials:true,
							headers: { "API-KEY" : "cee7fc84-58af-4506-9d89-136cc0031f74"}
						}).then(response=>{
							props.follow(u.id)
						})
					}
					else {
						axios.delete('https://social-network.samuraijs.com/api/1.0/follow/' + u.id,{
							withCredentials:true,
							headers: { "API-KEY" : "cee7fc84-58af-4506-9d89-136cc0031f74"}
						}).then(resopnse=>{
							props.unfollow(u.id)
						})
					}
				}
			    return(
					<div className = {SearchElements.back}>
						<div>
							<NavLink to = {'/profile/'+u.id}><div><img className = {SearchElements.item} 
									src = {u.photos.small==null?defaultBear:u.photos.small}  /></div></NavLink>
							<div className = {SearchElements.name}>{u.name}</div>
							<button onClick = {followFunc}>{followVariable}</button>
						</div>
					<div><textarea className = {SearchElements.text}></textarea></div>
					</div>
					)    					
				}
			)
    return <div> {pagesFilter} {users}</div>
  }
		

export default Search

