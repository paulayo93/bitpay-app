import React, {useState} from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../../utils/hooks';
import {FeedbackRateType} from '../../settings/about/screens/SendFeedback';
import {H4, Link, Paragraph} from '../../../../components/styled/Text';
import {LightBlack, SlateDark, White} from '../../../../styles/colors';

import HearFace from ' ../../../../../assets/img/settings/feedback/heart-face.svg';
import Smile from '../../../../../assets/img/settings/feedback/smile.svg';
import Speechless from '../../../../../assets/img/settings/feedback/speechless.svg';
import Question from '../../../../../assets/img/settings/feedback/question.svg';
import Close from '../../../../../assets/img/settings/feedback/close.svg';
import {useTranslation} from 'react-i18next';
import {saveUserFeedback} from '../../../../store/app/app.effects';
import {APP_VERSION} from '../../../../constants/config';

const FeedbackContainer = styled.View`
  margin: 20px 16px 0 16px;
  display: flex;
  flex-direction: column;
  padding: 25px 16px 16px 16px;
  background: ${({theme: {dark}}) => (dark ? LightBlack : White)};
  box-shadow: 0px 1px 9px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
`;

const FeedbackParagraph = styled(Paragraph)`
  margin-bottom: 30px;
  color: ${({theme: {dark}}) => (dark ? White : SlateDark)};
`;

const FeedbackHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const FeedbackTitleContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const FeedbackCloseContainer = styled.TouchableOpacity`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  text-align: right;
  width: 44px;
  height; 44px;
`;

const FeedbackTitle = styled(H4)`
  margin-left: 8px;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: ${({theme: {dark}}) => (dark ? White : SlateDark)};
`;

const EmojisContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EmojiActionContainer = styled.View`
  width: 100%;
  margin-bottom: 20px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EmojiAction = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
`;

const ConfirmRate = styled.TouchableOpacity`
  width: 100%;
  display: flex;
  padding-top: 16px;
  border-top-width: 1px;
  border-top-color: ${({theme: {dark}}) => (dark ? White : '#EBEBEB')};
`;

const ConfirmRateTitle = styled(Link)`
  text-align: left;
  font-size: 16px;
`;

const FeedbackCard: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const [preRate, setPreRate] = useState<FeedbackRateType>('default');

  const rateApp = (rate: FeedbackRateType) => {
    setPreRate(rate);
    dispatch(saveUserFeedback(rate, APP_VERSION));
    if (rate !== 'default') {
      navigation.navigate('About', {screen: 'SendFeedback'});
    }
  };

  return (
    <FeedbackContainer>
      <FeedbackHeader>
        <FeedbackTitleContainer>
          <Question width={24} height={24} />
          <FeedbackTitle>{t('Feedback')}</FeedbackTitle>
        </FeedbackTitleContainer>
        <FeedbackCloseContainer onPress={() => rateApp('default')}>
          <Close width={18} height={18} />
        </FeedbackCloseContainer>
      </FeedbackHeader>
      <FeedbackParagraph>
        {t('How satisfied are you with using BitPay?')}
      </FeedbackParagraph>
      <EmojisContainer>
        <EmojiActionContainer>
          <EmojiAction onPress={() => setPreRate('love')}>
            <HearFace
              width={44}
              height={44}
              opacity={preRate === 'love' ? 1 : preRate === 'default' ? 1 : 0.4}
            />
          </EmojiAction>
          <EmojiAction onPress={() => setPreRate('ok')}>
            <Smile
              width={44}
              height={44}
              opacity={preRate === 'ok' ? 1 : preRate === 'default' ? 1 : 0.4}
            />
          </EmojiAction>
          <EmojiAction onPress={() => setPreRate('disappointed')}>
            <Speechless
              width={44}
              height={44}
              opacity={
                preRate === 'disappointed' ? 1 : preRate === 'default' ? 1 : 0.4
              }
            />
          </EmojiAction>
        </EmojiActionContainer>
        {preRate && preRate !== 'default' ? (
          <ConfirmRate onPress={() => rateApp(preRate)}>
            <ConfirmRateTitle>
              {preRate === 'love' ? t('I love it!') : null}
              {preRate === 'ok' ? t("It's ok for now") : null}
              {preRate === 'disappointed' ? t("I'm disappointed") : null}
            </ConfirmRateTitle>
          </ConfirmRate>
        ) : null}
      </EmojisContainer>
    </FeedbackContainer>
  );
};

export default FeedbackCard;
