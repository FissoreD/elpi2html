import { Container } from "react-bootstrap"
import { useAppSelector } from "../app/hooks"
import Card from "./card"
import React from "react"

export function Body() {
  let db = useAppSelector(state => state.DB_State.db)
  let filterStr = useAppSelector(state => state.DB_State.filter)
  return (
    <Container>
      {db.map((x, pos) => filterStr === "" || x.predicate === filterStr ? <Card key={pos} {...x} /> :
          <React.Fragment key={pos}></React.Fragment>)}
    </Container> 
  )
}