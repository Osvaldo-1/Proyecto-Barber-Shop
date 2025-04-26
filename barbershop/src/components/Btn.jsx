
export default function Btn(props) {
  const clas = `btn ${props.classStyle}`
  return (
    <button type="button" className={clas} >{props.text}</button>
  )
}
