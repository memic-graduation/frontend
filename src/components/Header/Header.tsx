import React from 'react';
import { IoPowerOutline } from 'react-icons/io5';
import { LuUser2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import * as S from './Styles';
import { Logo } from '../../utils/Icons';

function Header() {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator('/');
  };
  return (
    <S.Layout>
      <S.LogoLayout onClick={handleClick}>
        <Logo />
        Me.Mic
      </S.LogoLayout>
      <S.MenuLayout>
        <S.MenuWrap>
          <S.IconBox>
            <IoPowerOutline />
          </S.IconBox>
          로그인
        </S.MenuWrap>
        <S.MenuWrap>
          <S.IconBox>
            <LuUser2 />
          </S.IconBox>
          마이페이지
        </S.MenuWrap>
      </S.MenuLayout>
    </S.Layout>
  );
}

export default Header;
