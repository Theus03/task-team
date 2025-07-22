import { useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Modal from './components/Modal';
import { modalStateAtom } from './atoms/modalAtom';
import { useRecoilState } from 'recoil';
import { taskListState } from './atoms/taskListState';
import { useTaskCRUD } from './hooks/useTaskCRUD';

function App() {
  const [_, setShowModal] = useRecoilState(modalStateAtom);
  const [task, setTasks] = useRecoilState(taskListState);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLDivElement>('[draggable="true"]');
    const columns = document.querySelectorAll<HTMLDivElement>('#pending, #progress, #done');

    let draggedCard: HTMLElement | null = null;

    const handleDragStart = (e: DragEvent) => {
      const card = e.currentTarget as HTMLElement;
      draggedCard = card;
      e.dataTransfer?.setData('text/plain', '');
      setTimeout(() => card.classList.add('hidden'), 0);
    };

    const handleDragEnd = (e: DragEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.classList.remove('hidden');
      draggedCard = null;
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      const column = e.currentTarget as HTMLElement;
      console.log(task);
      task[0].status = 2;
      useTaskCRUD().updateTask(task[0]);
      if (draggedCard) {
        console.log("chegou aui")
        column.appendChild(draggedCard);
      }
    };

    cards.forEach(card => {
      card.addEventListener('dragstart', handleDragStart);
      card.addEventListener('dragend', handleDragEnd);
    });

    columns.forEach(column => {
      column.addEventListener('dragover', handleDragOver);
      column.addEventListener('drop', handleDrop);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('dragstart', handleDragStart);
        card.removeEventListener('dragend', handleDragEnd);
      });

      columns.forEach(column => {
        column.removeEventListener('dragover', handleDragOver);
        column.removeEventListener('drop', handleDrop);
      });
    };
  }, [task]);

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
              { task.filter(t => t.status == 1)?.map(t => <Card key={t.id} task={t} />) }
          </div>
          <div id="progress" className='bg-blue-50 w-150 rounded'>
            <div className='p-4 bg-blue-400 text-lg text-white font-medium rounded rounded-l-none rounded-r-none'>Em Andamento</div>
              { task.filter(t => t.status == 2)?.map(t => <Card key={t.id} task={t} />) }
          </div>
          <div id="done" className='bg-green-50 w-150 rounded'>
            <div className='p-4 bg-green-400 text-lg text-white font-medium rounded rounded-l-none rounded-b-none'>Concluído</div>
              { task.filter(t => t.status == 3)?.map(t => <Card key={t.id} task={t} />) }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
