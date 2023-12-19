import './Tabela.css';

export default function Tabela({ disciplinas }) {
    const compararDisciplinas = (a, b) => {
      if (a.in_periodo !== b.in_periodo) {
        return a.in_periodo - b.in_periodo;
      }
      return a.tx_descricao.localeCompare(b.tx_descricao);
    };
  
    const disciplinasOrdenadas = disciplinas.sort(compararDisciplinas);
  
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sigla</th>
            <th>Descrição</th>
            <th>Período</th>
            <th>Carga Horária</th>
          </tr>
        </thead>
        <tbody>
          {disciplinasOrdenadas.map((disciplina, index) => (
            <tr key={index}>
              <td>{disciplina.id_disciplina}</td>
              <td>{disciplina.tx_sigla}</td>
              <td>{disciplina.tx_descricao}</td>
              <td>{disciplina.in_periodo}</td>
              <td>{disciplina.in_carga_horaria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }