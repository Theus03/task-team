import './App.css'

function App() {
  return (
    <div>
      <div className='flex justify-between px-32 py-12 items-center'>
        <h4 className='text-blue-500 font-black text-4xl'>TaskTeam</h4>
        <button className='text-white bg-blue-500 rounded-2xl px-6 py-3 text-lg font-medium cursor-pointer transition ease-in duration-200 hover:bg-blue-600 hover:-translate-x-1'>+ Nova Tarefa</button>
      </div>
      <div className='px-32 py-2' id="board">
        <div className='bg-blue-50 flex h-100'>
          <div id="pending" className='bg-amber-50 w-150'>
            <div className='p-4 bg-orange-400 text-lg text-white font-medium'>Pendente</div>
            <div className='p-6 m-6 bg-orange-200 cursor-move'></div>
          </div>
          <div id="progress" className='bg-blue-50 w-150'>
            <div className='p-4 bg-blue-400 text-lg text-white font-medium'>Em Andamento</div>
            <div className='p-6 m-6 bg-blue-200 cursor-move'></div>
          </div>
          <div id="done" className='bg-green-50 w-150'>
            <div className='p-4 bg-green-400 text-lg text-white font-medium'>Concluído</div>
            <div className='p-6 m-6 bg-green-200 cursor-move'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
