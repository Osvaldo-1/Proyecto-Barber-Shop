
export default function Btn(props) {
  const clas = `btn ${props.classStyle}`
  const types = props.tp
  const func = props.func || null
  return (
    <button type={types} className={clas} onClick={func}>{props.text}</button>
  )
}
