function Spinner({text = ""}) {
  return (
    <div className="grid items-center justify-center">
      <div className='spinner-3'></div>
      <p className="text-xl text-primary-200">{text}</p>
    </div>
  );
}

export default Spinner;
