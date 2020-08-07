import {
  CARD_TYPES,
  DEFAULT_CARD_SVG_LOGO
} from 'components/Form/CreditCardBox/model'
import { convertBaseToStandard } from 'data/components/exchange/services'
import { DisplayIcon } from 'components/SimpleBuy'
import { fiatToString } from 'core/exchange/currency'
import { FiatType, SBBalancesType, SBPaymentMethodType } from 'core/types'
import { FormattedMessage } from 'react-intl'
import { IcoMoonType } from 'blockchain-info-components/src/Icons/Icomoon'
import { Icon, Text } from 'blockchain-info-components'
import { Props } from '../template.success'
import { Title, Value } from 'components/Flyout'
import React, { ReactElement } from 'react'
import styled, { css } from 'styled-components'

type PaymentContainerProps = {
  isMethod: boolean
}

const PaymentContainer = styled.div<PaymentContainerProps>`
  border: 1px solid ${props => props.theme.grey100};
  box-sizing: border-box;
  height: 80px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  padding: ${props => (props.isMethod ? `12px 28px` : `23px 28px`)};
  justify-content: space-between;
  ${props => !props.isMethod && `line-height: 32px;`}
`

const PaymentText = styled(Text)<PaymentContainerProps>`
  flex: 1;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-left: 16px;
  ${props =>
    !props.isMethod &&
    css`
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 35px;
    `}
`
const PaymentArrowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const DisplayTitle = styled(Title)`
  margin-top: 4px;
`
const DisplayValue = styled(Value)`
  margin-top: 0px;
`

const DisplayPaymentIcon = styled(DisplayIcon)<PaymentContainerProps>`
  justify-content: center;
  ${props =>
    !props.isMethod &&
    css`
      background-color: ${props => props.theme.blue000};
      width: 32px;
      height: 32px;
      border-radius: 50%;
    `}
`

const renderCardText = (value: SBPaymentMethodType): string => {
  return value.card
    ? value.card.label
      ? value.card.label
      : value.card.type
    : 'Credit or Debit Card'
}

const renderCard = (value: SBPaymentMethodType) => (
  <>
    <DisplayValue>{renderCardText(value)}</DisplayValue>
    <DisplayTitle>
      <FormattedMessage
        id='modals.simplebuy.card_limit'
        defaultMessage='{card} Limit'
        values={{
          card: `${fiatToString({
            value: convertBaseToStandard('FIAT', value.limits.max),
            unit: value.currency as FiatType
          })} ${value.currency}`
        }}
      />
    </DisplayTitle>
  </>
)

const renderFund = (value: SBPaymentMethodType, sbBalances: SBBalancesType) => (
  <>
    <DisplayValue>{value.currency}</DisplayValue>
    <DisplayTitle>
      {fiatToString({
        value: convertBaseToStandard(
          'FIAT',
          sbBalances[value.currency]?.available || '0'
        ),
        unit: value.currency as FiatType
      })}{' '}
      <FormattedMessage id='copy.available' defaultMessage='Available' />
    </DisplayTitle>
  </>
)

const getIcon = (value: SBPaymentMethodType | undefined): ReactElement => {
  if (!value) {
    return (
      <Icon
        cursor
        name='plus-in-circle-filled'
        size='22px'
        color='blue600'
        style={{ marginLeft: '5px' }}
      />
    )
  }

  switch (value.type) {
    case 'USER_CARD':
      let cardType = CARD_TYPES.find(
        card => card.type === (value.card ? value.card.type : '')
      )
      return (
        <img
          height='18px'
          width='auto'
          src={cardType ? cardType.logo : DEFAULT_CARD_SVG_LOGO}
        />
      )
    case 'FUNDS':
      return (
        <Icon
          size='32px'
          color='fiat'
          name={value.currency.toLowerCase() as keyof IcoMoonType}
        />
      )
    default:
      return <></>
  }
}

const getText = (
  value: SBPaymentMethodType | undefined,
  sbBalances: SBBalancesType
): ReactElement => {
  if (!value) {
    return (
      <FormattedMessage
        id='modals.simplebuy.confirm.jump_to_payment'
        defaultMessage='Select Cash or Card'
      />
    )
  }

  return value.type === 'USER_CARD'
    ? renderCard(value)
    : renderFund(value, sbBalances)
}

const Payment: React.FC<Props> = props => (
  <PaymentContainer
    role='button'
    data-e2e='paymentMethodSelect'
    onClick={() =>
      props.simpleBuyActions.setStep({
        step: 'PAYMENT_METHODS',
        pair: props.pair,
        fiatCurrency: props.fiatCurrency || 'USD',
        cryptoCurrency: props.cryptoCurrency
      })
    }
    isMethod={!!props.method}
  >
    <DisplayPaymentIcon isMethod={!!props.method}>
      {getIcon(props.method)}
    </DisplayPaymentIcon>
    <PaymentText isMethod={!!props.method}>
      {getText(props.method, props.sbBalances)}
    </PaymentText>
    <PaymentArrowContainer>
      <Icon cursor name='arrow-right' size='20px' color='grey600' />
    </PaymentArrowContainer>
  </PaymentContainer>
)

export default Payment