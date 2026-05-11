import React from "react";
import styled from "styled-components";

const Card = styled.article`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.white + "20"};
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 420px;
  box-shadow: rgba(23, 92, 230, 0.12) 0px 4px 24px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: rgba(23, 92, 230, 0.25) 0px 10px 30px;
  }
`;

const LogoArea = styled.div`
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(
    180deg,
    rgba(22, 26, 40, 0.62) 0%,
    rgba(38, 22, 70, 0.36) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(6px);
`;

const Logo = styled.img`
  max-width: 240px;
  max-height: 110px;
  width: auto;
  height: auto;
  object-fit: contain;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: 20px;
  line-height: 1.3;
`;

const DateText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 13px;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primary + "22"};
  border-radius: 999px;
  padding: 5px 10px;
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  gap: 10px;
`;

const LinkButton = styled.a`
  flex: 1;
  text-align: center;
  text-decoration: none;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  background: ${({ theme, $secondary }) => ($secondary ? theme.bgLight : theme.primary)};
  transition: filter 0.2s ease;

  &:hover {
    filter: brightness(1.07);
  }
`;

const ProjectCard = ({ project, setOpenModal }) => {
  if (!project) return null;

  return (
    <Card onClick={() => setOpenModal({ state: true, project })}>
      <LogoArea>
        <Logo src={project.image} alt={project.title} loading="lazy" />
      </LogoArea>

      <Content>
        <Title>{project.title}</Title>
        <DateText>{project.date}</DateText>
        <Description>{project.description}</Description>

        <Tags>
          {project.tags?.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>

        <Footer>
          {project.github && (
            <LinkButton
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              $secondary
              onClick={(e) => e.stopPropagation()}
            >
              View Code
            </LinkButton>
          )}
          {project.webapp && (
            <LinkButton
              href={project.webapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              Live Demo
            </LinkButton>
          )}
        </Footer>
      </Content>
    </Card>
  );
};

export default ProjectCard;
