import { useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Modal from './components/Modal';
import { alertStateAtom, modalStateAtom } from './atoms/actionsAtom';
import { useRecoilState } from 'recoil';
import { taskListState } from './atoms/taskListState';
import { useTaskCRUD } from './hooks/useTaskCRUD';
import Alert from './components/Alert';

function App() {
  const [showModal, setShowModal] = useRecoilState(modalStateAtom);
  const [showAlert, setShowAlert] = useRecoilState(alertStateAtom);
  const [task, setTasks] = useRecoilState(taskListState);

  const { updateTask } = useTaskCRUD();

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLDivElement>('[draggable="true"]');
    const columns = document.querySelectorAll<HTMLDivElement>('[data-status]');

    setTimeout(() => {
      setTasks(task)
    }, 100000)

    let draggedCard: HTMLElement | null = null;

    const handleDragStart = (e: DragEvent) => {
      const card = e.currentTarget as HTMLElement;
      draggedCard = card;
      e.dataTransfer?.setData('text/plain', '');
      setTimeout(() => card.classList.add('hidden'), 0);
    };

    const handleDragEnd = () => {
      if (draggedCard) draggedCard.classList.remove('hidden');
      draggedCard = null;
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  console.log("Drop event fired");

  let target = e.target as HTMLElement | null;
  while (target && !target.dataset.status) {
    target = target.parentElement;
  }
  if (!target) return;

  const newStatus = parseInt(target.dataset.status || '0');

  if (draggedCard) {
    const taskId = parseInt(draggedCard.id);
    const taskAtual = task.find(t => t.id === taskId);

    if (taskAtual && taskAtual.status !== newStatus) {
      const taskAtualizada = { ...taskAtual, status: newStatus };

      updateTask(taskAtualizada);
      setTasks(prev => prev.map(t => (t.id === taskId ? taskAtualizada : t)));
      setShowAlert(true);

      setTimeout(() => { setShowAlert(false); }, 1000)
    }
    
    draggedCard.classList.remove('hidden');
    draggedCard = null;
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
  }, [task, updateTask]);

  return (
    <div>
      <div id="alert">
        <Alert />
      </div>
      <div id="modal">
        <Modal />
      </div>

      <div className="flex justify-between px-32 py-12 items-center">
        <h4 className="text-blue-500 font-black text-4xl">TaskTeam</h4>
        <div className="flex gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="text-white bg-blue-500 rounded-2xl px-6 py-3 text-lg font-medium cursor-pointer transition ease-in duration-200 hover:bg-blue-600 hover:-translate-x-1"
          >
            + Nova Tarefa
          </button>
        </div>
      </div>

      <div className="px-32 py-2" id="board">
        <div className="bg-blue-50 flex mb-6 gap-4">
          <div
            data-status="1"
            className="min-h-[300px] bg-amber-50 w-150 rounded h-auto"
          >
            <div className="p-4 bg-orange-400 text-lg text-white font-medium rounded-t">
              Pendente
            </div>
            {task.filter(t => t.status === 1).map(t => (
              <Card key={t.id} task={t} />
            ))}
          </div>

          <div
            data-status="2"
            className="min-h-[300px] pt-0 bg-blue-50 w-150 rounded"
          >
            <div className="p-4 bg-blue-400 text-lg text-white font-medium rounded-t">
              Em Andamento
            </div>
            {task.filter(t => t.status === 2).map(t => (
              <Card key={t.id} task={t} />
            ))}
          </div>

          <div
            data-status="3"
            className="min-h-[300px]  bg-green-50 w-150 rounded"
          >
            <div className="p-4 bg-green-400 text-lg text-white font-medium rounded-t">
              Concluído
            </div>
            {task.filter(t => t.status === 3).map(t => (
              <Card key={t.id} task={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
