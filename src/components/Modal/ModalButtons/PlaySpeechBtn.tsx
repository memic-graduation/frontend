/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import { PlayBtn } from 'src/assets/Icons';
import * as S from '../Styles';

interface Props {
  url: string;
}

function PlaySpeechBtn({ url }: Props) {
  const myRef = useRef<HTMLAudioElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const start = () => {
    if (url) {
      myRef.current.play();
      setIsClicked(false);
    }
  };
  useEffect(() => {
    myRef.current.currentTime = 0;
    start();
  }, [isClicked]);
  return (
    <>
      <audio ref={myRef} src={url} />
      <S.ResultBtnBox onClick={() => setIsClicked(true)}>
        나의 발음 듣기
        <PlayBtn width={15} />
      </S.ResultBtnBox>
    </>
  );
}

export default PlaySpeechBtn;
