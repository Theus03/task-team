import { useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Modal from './components/Modal';
import { modalStateAtom } from './atoms/modalAtom';
import { useRecoilState } from 'recoil';

function App() {
  const [_, setShowModal] = useRecoilState(modalStateAtom);

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
        }
      });
    });
  }, []);

  return (
    <div>
      <div id="modal" className=''>
        <Modal></Modal>
      </div>
      <div className='flex justify-between px-32 py-12 items-center'>
        <h4 className='text-blue-500 font-black text-4xl'>TaskTeam</h4>
        <div className='flex gap-2'>
          <button onClick={() => setShowModal(true)} className='text-white bg-blue-500 rounded-2xl px-6 py-3 text-lg font-medium cursor-pointer transition ease-in duration-200 hover:bg-blue-600 hover:-translate-x-1'>+ Nova Tarefa</button>
        </div>
      </div>
      <div className='px-32 py-2' id="board">
        <div className='bg-blue-50 flex mb-6'>
          <div id="pending" className='bg-amber-50 w-150 rounded h-auto'>
            <div className='p-4 bg-orange-400 text-lg text-white font-medium rounded rounded-r-none rounded-b-none'>Pendente</div>
              <Card />
          </div>
          <div id="progress" className='bg-blue-50 w-150 rounded'>
            <div className='p-4 bg-blue-400 text-lg text-white font-medium rounded rounded-l-none rounded-r-none'>Em Andamento</div>
              <Card />
              <Card />
          </div>
          <div id="done" className='bg-green-50 w-150 rounded'>
            <div className='p-4 bg-green-400 text-lg text-white font-medium rounded rounded-l-none rounded-b-none'>Concluído</div>
              <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
