import { Card as C, Row } from 'react-bootstrap';
import Dispatch from './dispatch';
import { CardType } from './types';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useAppSelector } from "../app/hooks"
import { filePathFromTitle } from "../tools"

function Card({ title, cnt, predicate }: CardType) {
  let filterStr = useAppSelector(state => state.DB_State.filter)
  let pathName = useAppSelector(state => state.DB_State.pathName)
  let display = (filterStr === "" || predicate.includes(filterStr)) &&
    (pathName === "" || filePathFromTitle(title) === pathName);
  return (
    <ResizableBox width={496} height={367} style={{
      padding: 0, margin: "1em",
      display: display ? "block" : "none"
    }} >
      <C border="primary overflow-auto h-100">
        <C.Header>{title}</C.Header>
        <C.Body className="my-auto">
          <Row className="h-100">
            <div className="my-auto">
              <Dispatch {...cnt} />
            </div>
          </Row>
        </C.Body>
      </C>
    </ResizableBox>
  )
}

export default Card;
