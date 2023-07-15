import { Container } from "react-bootstrap"
import { useAppSelector } from "../app/hooks"
import Card from "./card"

export function Body() {
  let db = useAppSelector((state) => state.DB_State.db)
  return (
    <Container>
      {db.map((x, pos) => <Card key={pos} {...x} />)}
    </Container> 
  )
}