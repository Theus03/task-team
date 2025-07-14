import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLDivElement>('[draggable="true"]');
    const columns = document.querySelectorAll<HTMLDivElement>('#pending, #progress, #done');

    let draggedCard: HTMLElement | null = null;

    cards.forEach(card => {
      card.addEventListener('dragstart', (e: DragEvent) => {
        draggedCard = card;
        e.dataTransfer?.setData('text/plain', '');
        setTimeout(() => card.classList.add('hidden'), 0);
      });

      card.addEventListener('dragend', () => {
        draggedCard?.classList.remove('hidden');
        draggedCard = null;
      });
    });

    columns.forEach(column => {
      column.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault();
      });

      column.addEventListener('drop', () => {
        if (draggedCard) {
          column.appendChild(draggedCard);

          draggedCard.classList.remove('bg-orange-200', 'bg-blue-200', 'bg-green-200');

          switch (column.id) {
            case 'pending':
              draggedCard.classList.add('bg-orange-200');
              break;
            case 'progress':
              draggedCard.classList.add('bg-blue-200');
              break;
            case 'done':
              draggedCard.classList.add('bg-green-200');
              break;
          }
        }
      });
    });
  }, []);

  return (
    <div>
      <div className='flex justify-between px-32 py-12 items-center'>
        <h4 className='text-blue-500 font-black text-4xl'>TaskTeam</h4>
        <button className='text-white bg-blue-500 rounded-2xl px-6 py-3 text-lg font-medium cursor-pointer transition ease-in duration-200 hover:bg-blue-600 hover:-translate-x-1'>+ Nova Tarefa</button>
      </div>
      <div className='px-32 py-2' id="board">
        <div className='bg-blue-50 flex h-100'>
          <div id="pending" className='bg-amber-50 w-150 rounded'>
            <div className='p-4 bg-orange-400 text-lg text-white font-medium rounded rounded-r-none'>Pendente</div>
            <div draggable className='p-6 m-6 bg-orange-200 cursor-move rounded shadow'>Teste 1</div>
          </div>
          <div id="progress" className='bg-blue-50 w-150 rounded'>
            <div className='p-4 bg-blue-400 text-lg text-white font-medium rounded rounded-l-none rounded-r-none'>Em Andamento</div>
            <div draggable className='p-6 m-6 bg-blue-200 cursor-move rounded shadow'>Teste 2</div>
          </div>
          <div id="done" className='bg-green-50 w-150 rounded'>
            <div className='p-4 bg-green-400 text-lg text-white font-medium rounded rounded-l-none'>Concluído</div>
            <div draggable className='p-6 m-6 bg-green-200 cursor-move rounded shadow'>Teste 3</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
