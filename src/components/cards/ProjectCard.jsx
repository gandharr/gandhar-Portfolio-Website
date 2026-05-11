import React from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  min-height: 520px;
  background-color: ${({ theme }) => theme.card};
  cursor: pointer;
  border-radius: 18px;
  border: 1px solid rgba(165, 132, 255, 0.2);
  box-shadow: 0 16px 32px rgba(8, 12, 24, 0.45);
  overflow: visible;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
  &:hover {
    transform: translateY(-8px);
    border-color: rgba(165, 132, 255, 0.45);
    box-shadow: 0 20px 44px rgba(10, 14, 32, 0.58), 0 0 22px rgba(127, 86, 217, 0.2);
  }

  @media only screen and (max-width: 768px) {
    min-height: auto;
    padding: 18px;
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  min-height: 170px;
  background: linear-gradient(135deg, rgba(20, 24, 40, 0.65) 0%, rgba(45, 28, 82, 0.45) 100%);
  border-radius: 20px;
  border: 1px solid rgba(190, 164, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 12px 28px rgba(6, 10, 24, 0.35);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;

  @media only screen and (max-width: 768px) {
    min-height: 156px;
    padding: 20px;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 250px;
  height: auto;
  max-height: 120px;
  object-fit: contain;
  object-position: center;
  display: block;
`;
const Tags = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 2px;
`;
const Tag = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.primary};
  background-color: rgba(130, 87, 229, 0.08);
  border: 1px solid rgba(165, 132, 255, 0.5);
  padding: 5px 10px;
  border-radius: 999px;
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px 2px;
  flex: 1;
`;
const Title = styled.div`
  font-size: 20px;
  line-height: 1.3;
  font-weight: 650;
  letter-spacing: 0.1px;
  color: ${({ theme }) => theme.text_primary};
  max-width: 100%;
`;
const Date = styled.div`
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-left: 2px;
  margin-top: 2px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};
  @media only screen and (max-width: 768px) {
    font-size: 11px;
  }
`;
const Description = styled.div`
  font-size: 14px;
  line-height: 1.65;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 8px;
  max-width: 100%;
`;
const Members = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-top: auto;
`;
const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  margin-left: -10px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 3px solid ${({ theme }) => theme.card};
`;


const ProjectCard = ({ project, setOpenModal }) => {
  return (
    <Card onClick={() => setOpenModal({ state: true, project: project })}>
      <ImageWrapper>
        <Image src={project.image} alt={project.title} />
      </ImageWrapper>
      <Tags>
        {project.tags?.map((tag, index) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </Tags>
      <Details>
        <Title>{project.title}</Title>
        <Date>{project.date}</Date>
        <Description>{project.description}</Description>
      </Details>
      <Members>
        {project.member?.map((member, i) => (
          <Avatar key={i} src={member.img} />
        ))}
      </Members>
    </Card>
  );
};

export default ProjectCard;
