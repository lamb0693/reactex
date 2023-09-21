export const ReducerObject = (props) => {

    return(
        <div>
            <button onClick={props.createNew} >새 멤버</button>  
              
            {props.list.map( (member) => {
                return <div key={member.name}>{member.name} {member.age} 
                    <button onClick={props.modifyMember} >수정</button> 
                    <button onClick={props.delMember} >지우기</button>
                </div> } ) }
        </div>      
    )

}