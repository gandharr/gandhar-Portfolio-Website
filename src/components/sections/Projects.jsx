import React from "react";
import styled from "styled-components";
import { projects } from "../../data/constants";
import ProjectCard from "../cards/ProjectCard";

const Section = styled.section`
  padding: 96px 20px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1140px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: stretch;
`;

const Heading = styled.h2`
  font-size: 48px;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Sub = styled.p`
  margin: 0 auto;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-weight: 600;
  font-size: 16px;
  max-width: 780px;
  padding-bottom: 6px;
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  gap: 22px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const Projects = ({ openModal, setOpenModal }) => {
  return (
    <Section id="Projects" aria-labelledby="projects-heading">
      <Inner>
        <Heading id="projects-heading">Projects</Heading>
        <Sub>Here are some of my recent projects.</Sub>

        <Grid>
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} openModal={openModal} setOpenModal={setOpenModal} />
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};

export default Projects;
