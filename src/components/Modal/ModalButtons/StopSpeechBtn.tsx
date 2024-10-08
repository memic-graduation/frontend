import React from 'react';
import { Stop } from 'src/assets/Icons';
import * as S from '../Styles';

interface Props {
  onClick: () => void;
}

function StopSpeechBtn({ onClick }: Props) {
  return (
    <S.RecordBtn onClick={() => onClick()}>
      STOP
      <Stop width="10" />
    </S.RecordBtn>
  );
}

export default StopSpeechBtn;
