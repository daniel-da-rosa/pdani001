import { useState, useEffect } from 'react';
import Header from './Componentes/Header';
import SelectOpcao from './Componentes/SelectOpcao';

function App() {
  const [selecionado, setSelecionado] = useState(Array(6).fill(''));

  useEffect(() => {
   
  }, [selecionado]);

  return (
    <>
      <Header />
      <SelectOpcao selecionado={selecionado} setSelecionado={setSelecionado}/>
      
    </>
  );
}

export default App;

