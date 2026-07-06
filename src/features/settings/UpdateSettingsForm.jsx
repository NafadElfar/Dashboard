import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";
import { useSettings } from "./userSetting";
import { useUpdateSettings } from "./useUpdateSettings";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Spinner from "../../ui/Spinner";
function UpdateSettingsForm() {
  const { error, isLoading, settings } = useSettings();
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings || {};

  const { isUpdating, updateSettings } = useUpdateSettings();

  function handleUpdateSettings(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSettings({ [field]: value });
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Form>
      <div>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="min-nights"
            defaultValue={minBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdateSettings(e, "minBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="max-nights"
            defaultValue={maxBookingLength}
            disabled={isUpdating}
            onBlur={(e) => handleUpdateSettings(e, "maxBookingLength")}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="max-guests"
            defaultValue={maxGuestsPerBooking}
            disabled={isUpdating}
            onBlur={(e) => handleUpdateSettings(e, "maxGuestsPerBooking")}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfast-price"
            defaultValue={breakfastPrice}
            disabled={isUpdating}
            onBlur={(e) => handleUpdateSettings(e, "breakfastPrice")}
          />
        </FormRow>
      </div>
    </Form>
  );
}

export default UpdateSettingsForm;
