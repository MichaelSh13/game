import clsx from "clsx";
import { forwardRef } from "react";
import "./index.scss"

type ButtonProps = React.ComponentPropsWithRef<'button'>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(`button`, className)}
      />
    );
  }
);
