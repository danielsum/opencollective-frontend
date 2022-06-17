import React from 'react';
import PropTypes from 'prop-types';
import { ExclamationCircle } from '@styled-icons/fa-solid/ExclamationCircle';
import { Question } from '@styled-icons/remix-line/Question';
import { FormattedMessage } from 'react-intl';

import PrivateInfoIcon from './icons/PrivateInfoIcon';
import { Box, Flex } from './Grid';
import StyledTooltip from './StyledTooltip';
import { P, Span } from './Text';

const PrivateIconWithSpace = () => (
  <React.Fragment>
    &nbsp;
    <PrivateInfoIcon tooltipProps={{ containerVerticalAlign: 'text-top' }} />
  </React.Fragment>
);

// eslint-disable-next-line react/prop-types
const QuestionMarkIconWithSpace = ({ helpText, labelFontSize, labelColor }) => (
  <StyledTooltip content={helpText}>
    &nbsp;
    <Question size={labelFontSize} color={labelColor} />
  </StyledTooltip>
);

/**
 * Form field to display an input element with a label and errors. Uses [renderProps](https://reactjs.org/docs/render-props.html#using-props-other-than-render) to pass field props like 'name' and 'id' to child input.
 */
const StyledInputField = ({
  children,
  label,
  htmlFor,
  name,
  error,
  hint,
  success,
  disabled,
  required,
  inputType,
  labelFontSize,
  labelFontWeight,
  labelColor,
  labelProps,
  hideOptionalLabel,
  useRequiredLabel,
  isPrivate,
  helpText,
  ...props
}) => {
  const isCheckbox = inputType === 'checkbox';
  htmlFor = htmlFor || (name ? `input-${name}` : undefined);
  const displayOptionalLabel = hideOptionalLabel ? false : required === false;
  const displayRequiredLabel = useRequiredLabel ? required === true : false;
  labelFontWeight = labelProps?.fontWeight || labelFontWeight;
  labelFontSize = labelProps?.labelFontSize || labelFontSize;
  const labelContent = label && (
    <Span color={labelColor} fontSize={labelFontSize} fontWeight={labelFontWeight}>
      {label}
    </Span>
  );

  return (
    <Box {...props}>
      <Flex flexDirection={isCheckbox ? 'row-reverse' : 'column'} justifyContent="flex-end">
        {label && (
          <P
            as="label"
            htmlFor={htmlFor}
            display="flex"
            alignItems="center"
            fontSize={labelFontSize}
            fontWeight={labelFontWeight}
            mb={isCheckbox ? 0 : 2}
            mr={2}
            ml={isCheckbox ? 2 : undefined}
            cursor={isCheckbox ? 'pointer' : undefined}
            {...labelProps}
          >
            {displayOptionalLabel && !isCheckbox ? (
              <Span color="black.700" fontWeight="normal">
                <FormattedMessage
                  id="OptionalFieldLabel"
                  defaultMessage="{field} (optional)"
                  values={{ field: labelContent }}
                />
                {isPrivate && <PrivateIconWithSpace />}
              </Span>
            ) : displayRequiredLabel ? (
              <Span color="black.700">
                {labelContent} * {isPrivate && <PrivateIconWithSpace />}
              </Span>
            ) : (
              <React.Fragment>
                {labelContent}
                {isPrivate && <PrivateIconWithSpace />}
              </React.Fragment>
            )}
            {helpText && (
              <QuestionMarkIconWithSpace helpText={helpText} labelColor={labelColor} labelFontSize={labelFontSize} />
            )}
          </P>
        )}
        {typeof children === 'function'
          ? children({
              name: name || htmlFor,
              id: htmlFor,
              type: inputType,
              error: Boolean(error) || undefined,
              success,
              disabled,
              required,
            })
          : children}
      </Flex>
      {error && typeof error === 'string' && (
        <Box pt={2}>
          <ExclamationCircle color="#E03F6A" size={16} />
          <Span ml={1} color="black.700" fontSize="14px" css={{ verticalAlign: 'middle' }}>
            {error}
          </Span>
        </Box>
      )}
      {hint && !error && (
        <Box mt="6px">
          <Span fontSize="12px" color="black.700" css={{ verticalAlign: 'middle' }}>
            {hint}
          </Span>
        </Box>
      )}
    </Box>
  );
};

StyledInputField.propTypes = {
  /** React component to wrap with the label and errors */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  /** Show disabled state for field */
  disabled: PropTypes.bool,
  /** If true, a "Private" lock icon will be displayed next to the label */
  isPrivate: PropTypes.bool,
  /** text to display below the input or error status */
  error: PropTypes.any,
  /** text to display below the input when there's no error */
  hint: PropTypes.any,
  /** the label's 'for' attribute to be used as the 'name' and 'id' for the input */
  htmlFor: PropTypes.string,
  /** By default name is equal to htmlFor, but you can use this prop to override it */
  name: PropTypes.string,
  /** text to display above the input */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** Passed to input as `type`. Adapts layout for checkboxes */
  inputType: PropTypes.string,
  /** Show success state for field */
  success: PropTypes.bool,
  /** If set to false, the field will be marked as optional */
  required: PropTypes.bool,
  /** If set to true, will hide the (optional) label tag even if required is false and display "*" if required */
  useRequiredLabel: PropTypes.bool,
  /** Font size for the label */
  labelFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  /** Font weight for the label */
  labelFontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
  labelColor: PropTypes.string,
  /** Anything here will be passed down to label */
  labelProps: PropTypes.object,
  /** Help text that will appear next to the label (a small question mark with help text shown when hovered) */
  helpText: PropTypes.string,
  /** All props from `Box` */
  ...Box.propTypes,
};

StyledInputField.defaultProps = {
  labelColor: 'black.800',
  labelFontWeight: 'normal',
};

export default StyledInputField;
