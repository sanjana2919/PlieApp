import React, { FC, useEffect, useRef, useState } from 'react';
import { Image, Text, TextProps } from 'react-native';
import images from '../../assets/images/images';
import { landingScreenStyles } from '../../screens/AuthModule/LoginScreen/landingScreenStyle';
import { useThemeMode } from '../../context/ThemeContext';

export interface TypewriterTextProps extends Omit<TextProps, 'children'> {
  /** Array of strings to cycle through */
  texts: string[];
  /** Typing speed in ms per character */
  typingSpeed?: number;
  /** Deleting speed in ms per character */
  deletingSpeed?: number;
  /** Pause duration after full word is typed (ms) */
  pauseAfterFull?: number;
  /** Pause duration after text is fully deleted (ms) */
  pauseAfterEmpty?: number;
  /** Whether to loop through texts continuously */
  loop?: boolean;
  /** Whether to start the animation automatically */
  autoStart?: boolean;
  /** Callback when all texts have been completed (only if loop is false) */
  onComplete?: () => void;
  /** Custom cursor character (set to empty string to disable) */
  cursor?: string;
  /** Whether to show cursor */
  showCircleCursor?: boolean;
  /** Blinking speed for cursor (ms) */
  cursorBlinkSpeed?: number;
}

const TypewriterText: FC<TypewriterTextProps> = ({
  texts,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseAfterFull = 1000,
  pauseAfterEmpty = 500,
  loop = true,
  autoStart = true,
  onComplete,
  cursor = '|',
  showCircleCursor = true,
  cursorBlinkSpeed = 530,
  style,
  ...textProps
}) => {
  const mode = useThemeMode();
  const [display, setDisplay] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [cursorVisible, setCursorVisible] = useState(true);

  const timeoutRef = useRef<number | null>(null);
  const cursorIntervalRef = useRef<number | null>(null);
  const customStyle = landingScreenStyles(mode);

  // Cursor blinking effect
  useEffect(() => {
    if (!showCircleCursor) {
      setCursorVisible(false);
      return;
    }

    cursorIntervalRef.current = setInterval(() => {
      setCursorVisible(v => !v);
    }, cursorBlinkSpeed);

    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [showCircleCursor, cursorBlinkSpeed]);

  // Main typing effect
  useEffect(() => {
    if (!isRunning || texts.length === 0) return;

    const currentText = texts[textIndex];
    let delay = isDeleting ? deletingSpeed : typingSpeed;

    // Just finished typing the whole word
    if (!isDeleting && display === currentText) {
      delay = pauseAfterFull;

      // If not looping and this is the last text, stop
      if (!loop && textIndex === texts.length - 1) {
        timeoutRef.current = setTimeout(() => {
          setIsRunning(false);
          onComplete?.();
        }, delay);
        return;
      }

      timeoutRef.current = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
      return;
    }

    // Just finished deleting everything
    if (isDeleting && display === '') {
      delay = pauseAfterEmpty;
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false);
        setTextIndex(i => (i + 1) % texts.length);
      }, delay);
      return;
    }

    // Normal typing/deleting step
    timeoutRef.current = setTimeout(() => {
      if (isDeleting) {
        setDisplay(d => currentText.slice(0, Math.max(0, d.length - 1)));
      } else {
        setDisplay(d =>
          currentText.slice(0, Math.min(currentText.length, d.length + 1)),
        );
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    display,
    isDeleting,
    isRunning,
    textIndex,
    texts,
    typingSpeed,
    deletingSpeed,
    pauseAfterFull,
    pauseAfterEmpty,
    loop,
    onComplete,
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  // Control methods
  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setDisplay('');
    setTextIndex(0);
    setIsDeleting(false);
  };
  const restart = () => {
    reset();
    start();
  };

  // Expose methods via ref if needed (optional)
  React.useImperativeHandle((textProps as any).ref, () => ({
    start,
    stop,
    reset,
    restart,
    currentText: texts[textIndex],
    currentIndex: textIndex,
    isRunning,
    isDeleting,
  }));

  if (texts.length === 0) {
    return <Text style={style} {...textProps} />;
  }

  return (
    <>
      <Text style={style} {...textProps}>
        {display}
      </Text>
      {showCircleCursor && (
        <Image source={images.circle} style={[customStyle.circleImage]} />
      )}
    </>
  );
};

export default TypewriterText;
