// import { Button, Icon, Image, Text } from 'blockchain-info-components'
// import { FlyoutWrapper } from 'components/Flyout'
// import { FormattedMessage } from 'react-intl'
// import { Props as OwnProps, SuccessStateType } from '.'
// import React from 'react'
// import styled from 'styled-components'

// export type Props = OwnProps & SuccessStateType

// const Top = styled(FlyoutWrapper)`
//   padding-bottom: 0px;
//   position: relative;
//   height: 100%;
//   display: flex;
// `

// const CloseIcon = styled(Icon)`
//   position: absolute;
//   padding: inherit;
//   left: 0px;
//   top: 0px;
// `

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
// `

// const Title = styled(Text)`
//   margin: 56px 0 16px 0;
//   text-align: center;
// `

// const Subcontent = styled(Text)`
//   margin-bottom: 56px;
//   text-align: center;
// `

// const Success: React.FC<Props> = props => {
//   return (
//     <Top>
//       <CloseIcon
//         cursor
//         name='close'
//         size='20px'
//         color='grey600'
//         role='button'
//         // onClick={() =>
//         //   close modal
//         // }
//       />
//       <Container>
//         <Image width='100px' name='bank-success' />
//         <Title color='grey800' size='20px' weight={600}>
//           <FormattedMessage
//             id='copy.bank_linked_title'
//             defaultMessage='Bank Linked'
//           />
//         </Title>
//         <Subcontent color='grey600' weight={500}>
//             <FormattedMessage
//               id='copy.bank_linked'
//               defaultMessage='Your {bankName} account is now linked to your Blockchain.com Wallet'
//             />
//         </Subcontent>
//         <Button
//           data-e2e='submitSBAmount'
//           height='48px'
//           size='16px'
//           nature='primary'
//         //   onClick={() =>
//         //     add function here that takes user to checkout confirmation
//         //   }
//           fullwidth
//         >
//           <FormattedMessage id='buttons.ok' defaultMessage='OK' />
//         </Button>
//       </Container>
//     </Top>
//   )
// }

// export default Success
