import React from 'react';
import styled from 'styled-components';
import Highlighter from 'react-highlight-words';
import { useRecoilValue } from 'recoil';
import { scrapedSentences } from 'src/recoil/selectors';

interface Prop {
  dataId: number;
  data: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  textColor?: string;
}
interface TextProp {
  textColor?: string;
}

const HightLightText = ({ dataId, data, onClick, textColor }: Prop) => {
  const queries = useRecoilValue(scrapedSentences(dataId)) || [];
  return (
    <TextLayout onClick={onClick} textColor={textColor}>
      <Highlighter highlightClassName={`scraped ${dataId}`} searchWords={queries} textToHighlight={data} />
    </TextLayout>
  );
};

export default HightLightText;

const TextLayout = styled.div<TextProp>`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 500;
  margin-left: 3%;
  line-height: 1.5;
  color: ${(props) => (props.textColor ? props.textColor : '#696565')};
`;