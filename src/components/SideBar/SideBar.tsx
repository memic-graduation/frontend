import React from 'react';
import { SideBarBtn, Write } from 'src/assets/Icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInState, selectedPhrase, showOverall, sideBarOpenState } from 'src/recoil/states';
import { useNavigate } from 'react-router-dom';
import ToggleBtn from './ToggleBtn/ToggleBtn';
import PhraseList from './PhraseList/PhraseList';
import PhraseEditCard from './PhraseCard/PhraseEditCard';
import PhraseAllList from './PhraseList/PhraseAllList';
import * as S from './Styles';

const SideBar = () => {
  const [isOpen, setIsOpen] = useRecoilState(sideBarOpenState);
  const [phrase, setPhrase] = useRecoilState(selectedPhrase);
  const isOverall = useRecoilValue(showOverall);
  const isLogin = useRecoilValue(isLoggedInState);
  const navigate = useNavigate();

  const handleBackGroundClick = () => {
    setPhrase('');
    setIsOpen(false);
  };

  return (
    <>
      {isOpen ? <S.BackLayout onClick={handleBackGroundClick} /> : null}
      <S.Layout $isopen={isOpen}>
        {isOpen ? (
          <>
            <S.Header $isopen={isOpen}>
              <S.Title>
                <Write />
                표현 저장소
              </S.Title>
              <SideBarBtn onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
            </S.Header>
            <ToggleBtn />
            {isLogin ? (
              <>
                {phrase !== '' && <PhraseEditCard />}
                {isOverall ? <PhraseAllList /> : <PhraseList />}
              </>
            ) : (
              <S.NullLayout>
                표현을 저장 하려면 로그인 하세요!
                <S.LoginBtn onClick={() => navigate('/login')}>로그인 하기</S.LoginBtn>
              </S.NullLayout>
            )}
          </>
        ) : (
          <S.Header $isopen={isOpen}>
            <S.Title>
              <Write width="15%" />
              표현 저장소
            </S.Title>
            <SideBarBtn onClick={() => setIsOpen(true)} style={{ width: '15', cursor: 'pointer' }} />
          </S.Header>
        )}
      </S.Layout>
      {isOpen ? <style>{'body { overflow: hidden; }'}</style> : null}
    </>
  );
};

export default SideBar;
