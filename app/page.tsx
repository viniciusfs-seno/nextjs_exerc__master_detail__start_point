"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabela from "./Componentes/index";

function Home() {
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState("select");
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const urlCurso =
    "https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/curso";
  const urlDisciplina =
    "https://pcn662vet2.execute-api.us-east-1.amazonaws.com/dev/disciplinas_por_curso/";

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await axios.get(urlCurso);

        if (response.status !== 200) {
          throw new Error(`Erro ao Buscar Cursos: ${response.statusText}`);
        }

        const cursos = response.data.data || [];
        console.log("Cursos obtidos com sucesso:", cursos);
        setCursos(cursos);
      } catch (error) {
        console.error("Erro durante a requisição de cursos:", error.message);
      }
    };

    fetchCursos();
  }, []);

  const montarTabela = async (idCurso, periodo) => {
    const url = `${urlDisciplina}${idCurso}`;
    console.log("URL Disciplina:", url);

    try {
      const response = await axios.get(url);

      if (response.status !== 200) {
        console.log("Erro na requisição de disciplinas:", response.statusText);
        return;
      }

      const data = response.data.data || [];
      const disciplinasFiltradas = periodo !== "all"
        ? data.filter((disciplina) => disciplina.in_periodo === Number(periodo))
        : data;

      console.log("Disciplinas obtidas com sucesso:", disciplinasFiltradas);
      setDisciplinas(disciplinasFiltradas);
    } catch (error) {
      console.error("Erro durante a requisição de disciplinas:", error.message);
    }
  };

  const handleCursoSelect = (event) => {
    const selectedValue = event.currentTarget.value;
    console.log("Curso Selecionado:", selectedValue);
    setSelectedCurso(selectedValue);
    montarTabela(selectedValue, selectedPeriod);
  };

  const handlePeriodSelect = (event) => {
    const selectedValue = event.currentTarget.value;
    console.log("Período Selecionado:", selectedValue);
    setSelectedPeriod(selectedValue);
    montarTabela(selectedCurso, selectedValue);
  };

  return (
      <>
        <h1>DISCIPLINA X CURSO</h1>
        <div className="filters-container">
          <section className="filter-section">
            <h2 className="cursos-title">CURSOS</h2>
            <select
              name="cursos"
              id="cursos"
              onChange={handleCursoSelect}
              value={selectedCurso}
            >
              <option value="select">-- SELECT --</option>
              {cursos.map((curso) => (
                <option key={curso.id_curso} value={curso.id_curso}>
                  {curso.tx_descricao}
                </option>
              ))}
            </select>
          </section>
          <section className="filter-section">
            <h2>PERÍODO</h2>
            <select
              name="periodo"
              id="periodo"
              onChange={handlePeriodSelect}
              value={selectedPeriod}
            >
              <option value="all">Todos</option>
              <option value="1">1º Período</option>
              <option value="2">2º Período</option>
              <option value="3">3º Período</option>
              <option value="4">4º Período</option>
              <option value="5">5º Período</option>
              <option value="6">6º Período</option>
            </select>
          </section>
        </div>
        <Tabela disciplinas={disciplinas} />
      </>
  );
}

export default Home;