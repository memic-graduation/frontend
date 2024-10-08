import React, { useEffect, useState } from 'react';
import { Close, Index } from 'src/assets/Icons';
import {
  forceRefresh,
  scriptIDstate,
  scriptSentencestate,
  selectedPhrase,
  selectedTags,
  sideBarOpenState,
} from 'src/recoil/states';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import { getSelectedPhrase } from 'src/utils/getSelectedPhrase';
import { getPhraseIndex } from 'src/utils/getPhraseIndex';
import { userToken } from 'src/recoil/selectors';
import * as S from './Styles';
import TagSelector from '../TagSelector/TagSelector';
import MeaningInput from './MeaningInput';

const PhraseEditCard = () => {
  const [phrase, setPhrase] = useRecoilState(selectedPhrase);
  const sentenceId = useRecoilValue(scriptIDstate);
  const [tags, setTags] = useRecoilState(selectedTags);
  const [meaning, setMeaning] = useState('');
  const [defaultMean, setDefaultMean] = useState('');
  const setSideBarOpen = useSetRecoilState(sideBarOpenState);
  const { resetSelection } = getSelectedPhrase();
  const scriptSentence = useRecoilValue(scriptSentencestate);
  const { startIndex, endIndex } = getPhraseIndex(scriptSentence, phrase);
  const token = useRecoilValue(userToken);
  const setRefresh = useSetRecoilState(forceRefresh);

  const handleGetMeaning = async () => {
    try {
      const response = await axios.post('/v1/translate', { phrase });
      setDefaultMean(response.data.meaningInKorean);
    } catch (e) {
      alert(e);
    }
  };

  const handleDeleteTag = (idx: number) => {
    const newTags = [...tags];
    newTags.splice(idx, 1);
    setTags(newTags);
  };

  const handleSubmit = async () => {
    const finalMean = meaning || defaultMean;
    const tagIds = tags.map((tag) => tag.id);
    const data = {
      sentence: phrase,
      sentenceId,
      startIndex,
      endIndex,
      meaning: finalMean,
      tagIds,
    };
    try {
      await axios.post('v1/phrases', data, {
        headers: {
          Authorization: token,
        },
      });
    } catch (e) {
      console.log(e);
    }
    setPhrase('');
    setRefresh((prev) => prev + 1);
  };

  const handleClose = () => {
    resetSelection();
    setPhrase('');
    setSideBarOpen(false);
  };

  useEffect(() => {
    handleGetMeaning();
    setTags([]);
  }, []);

  return (
    <S.Layout $isselected={false}>
      <S.IconBox>
        <Index />
        <Close onClick={handleClose} />
      </S.IconBox>

      <S.HashTagBox>
        태그 추가 :
        <TagSelector />
      </S.HashTagBox>
      <S.HashTagBox>
        {tags
          .map((v) => v.name)
          .map((v, i) => (
            <S.HashTag key={v}>
              #{v}
              <Close width={12} height={12} onClick={() => handleDeleteTag(i)} style={{ cursor: 'pointer' }} />
            </S.HashTag>
          ))}
      </S.HashTagBox>
      <S.PhraseBox $isselected={false}>{phrase}</S.PhraseBox>
      <MeaningInput defaultMean={defaultMean} setMeaning={setMeaning} />
      <S.ButtonBox>
        <S.Button onClick={() => setPhrase('')}>취소</S.Button>
        <S.Button onClick={() => handleSubmit()}>완료</S.Button>
      </S.ButtonBox>
    </S.Layout>
  );
};

export default PhraseEditCard;
