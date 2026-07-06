import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../bookings/BookingDataBox";
import { useSettings } from "../settings/userSetting";
import { useBooking } from "..//bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";

import styled from "styled-components";
import { useCheckin } from "./useCheckin";

const Box = styled.div`
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confrimPaid, setConfirmPaid] = useState(false);
  const [addBreackfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const { bookings = [], isLoading } = useBooking();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = bookings;

  useEffect(() => {
    setConfirmPaid(bookings?.isPaid ?? false);
  }, [bookings]);

  const { checkin, isCheckingIn } = useCheckin();

  const { settings, isLoading: isLoadingSettings } = useSettings();
  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  function handleCheckin() {
    if (!confrimPaid) return;
    if (addBreackfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  if (isLoading || isLoadingSettings) return <Spinner />;
  // We return a fragment so that these elements fit into the page's layout
  return (
    <>
      <Row type="horizontal">
        <Heading type="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={bookings} />
      {!hasBreakfast && (
        <Checkbox
          checked={addBreackfast}
          onChange={() => {
            (setAddBreakfast((add) => !add), setConfirmPaid(false));
          }}
        >
          Want to add breackfast for {formatCurrency(optionalBreakfastPrice)}
        </Checkbox>
      )}
      <Checkbox
        checked={confrimPaid}
        onChange={() => setConfirmPaid((confrim) => !confrim)}
        disabled={confrimPaid || isCheckingIn}
        id="confirm"
      >
        I confirm that {guests.fullName} has paid the total amount{" "}
        {!addBreackfast
          ? formatCurrency(totalPrice)
          : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
      </Checkbox>

      <ButtonGroup>
        <Button
          variation="primary"
          size="medium"
          onClick={handleCheckin}
          disabled={!confrimPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" size="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
