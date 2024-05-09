import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { scrapedListById, youtubeIDSelector } from 'src/recoil/selectors';
import PhraseCard from '../PhraseCard/PhraseCard';

const PhraseList = () => {
  const [list, setList] = useState([]);
  const [tags, setTags] = useState([]);
  const youtubeId = useRecoilValue(youtubeIDSelector);
  const getScrap = useRecoilValue(scrapedListById(youtubeId));

  const handleGetPhrases = async () => {
    if (youtubeId) {
      getScrap().then((data) => {
        setList(data);
        const tagList = data?.map((v) => v.tags.map((tag) => tag.name));
        setTags(tagList);
      });
    }
  };
  useEffect(() => {
    handleGetPhrases();
  }, []);
  return (
    <Layout>
      {list.length ? (
        list.map((v, i) => <PhraseCard key={v.id} phrase={v.phrase} meaning={v.meaning} TagIds={tags[i]} />)
      ) : (
        <div>저장된 표현이 없습니다</div>
      )}
    </Layout>
  );
};

export default PhraseList;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 85%;
  padding-top: 1rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    border-radius: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 1.25rem;
    background: rgba(217, 217, 217, 0.6);
  }
`;
