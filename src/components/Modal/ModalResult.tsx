/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  audioUrlState,
  recognizedWords,
  recordingState,
  scriptSentencestate,
  wordColorPalette,
} from 'src/recoil/states';
import styled from 'styled-components';
import { Checkmark } from 'react-checkmark';
import { useModalStack } from 'src/utils/useModalStack';
import { isAllMatched } from 'src/recoil/selectors';
import PlaySpeechBtn from './ModalButtons/PlaySpeechBtn';
import ReSpeechBtn from './ModalButtons/ReSpeechBtn';
import * as S from './Styles';
import ModalReSpeech from './ModalReSpeech';

function ModalResult() {
  const setRecordStatus = useSetRecoilState(recordingState);
  const originalWords = useRecoilValue(scriptSentencestate).split(' ');
  const wordList = useRecoilValue(recognizedWords);
  const { push, pop } = useModalStack();
  const audioUrl = useRecoilValue(audioUrlState);
  const allMatched = useRecoilValue(isAllMatched);
  const colors = useRecoilValue(wordColorPalette);

  const handleClickReSpeech = () => {
    setRecordStatus('inactive');
    pop();
    pop();
  };

  const handleClickWrongText = (i: number, color: string) => {
    const word = originalWords[i];
    push({ key: 'modal-respeech', Component: ModalReSpeech, Props: { word, color }, popOnce: true });
  };

  return (
    <Layout>
      {allMatched ? (
        <Layout>
          <S.TitleBox>* 모든 단어를 완벽하게 발음했어요!</S.TitleBox>
          <IconBox>
            <Checkmark size="large" color="#0AC78E" />
          </IconBox>
          <FlexLayout style={{ gap: '0.2rem' }}>
            {wordList.map((v) => (
              <CorrectText>{v.word}&nbsp;</CorrectText>
            ))}
          </FlexLayout>
        </Layout>
      ) : (
        <Layout>
          <S.TitleBox>* AI가 내 발음을 이렇게 평가했어요!</S.TitleBox>
          <FlexLayout style={{ gap: '0.2rem' }}>
            {wordList.map((v) =>
              v.isMatchedWithTranscription ? (
                <ResultText>{v.word}&nbsp;</ResultText>
              ) : (
                <WrongText>{v.word}&nbsp;</WrongText>
              ),
            )}
          </FlexLayout>
          <TitleBox>* 놓친 단어들을 다시 발음해보세요!</TitleBox>
          <FlexLayout>
            {wordList.map(
              (v, i) =>
                !v.isMatchedWithTranscription && (
                  <WordBox
                    style={{ background: `${colors[i % 7]}` }}
                    onClick={() => handleClickWrongText(i, colors[i % 7])}
                  >
                    {originalWords[i]}
                  </WordBox>
                ),
            )}
          </FlexLayout>
        </Layout>
      )}
      <FlexLayout>
        <PlaySpeechBtn url={audioUrl} />
        <ReSpeechBtn onClick={handleClickReSpeech} />
      </FlexLayout>
    </Layout>
  );
}

export default ModalResult;

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.8rem;
`;

const ResultText = styled.div`
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5;
  color: black;
`;

const WrongText = styled(ResultText)`
  color: #ff5c5c;
  font-weight: 500;
`;

const CorrectText = styled(ResultText)`
  color: #0ac78e;
`;

const FlexLayout = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
`;

const IconBox = styled.div`
  margin-right: 0.5rem;
`;

const TitleBox = styled.div`
  color: #ff5c5c;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
`;

const WordBox = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-radius: 0.625rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
`;
