import { useEffect, useCallback } from 'react';
import { Direction } from '../types';

interface SwipeControlsProps {
  onDirectionChange: (direction: Direction) => void;
  disabled?: boolean;
}

export const useSwipeControls = ({ onDirectionChange, disabled }: SwipeControlsProps) => {
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (disabled) return;
    
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    const handleTouchEnd = (endEvent: TouchEvent) => {
      const endTouch = endEvent.changedTouches[0];
      const endX = endTouch.clientX;
      const endY = endTouch.clientY;
      
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      const minSwipeDistance = 30;
      
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 水平滑动
        if (Math.abs(deltaX) > minSwipeDistance) {
          if (deltaX > 0) {
            onDirectionChange(Direction.RIGHT);
          } else {
            onDirectionChange(Direction.LEFT);
          }
        }
      } else {
        // 垂直滑动
        if (Math.abs(deltaY) > minSwipeDistance) {
          if (deltaY > 0) {
            onDirectionChange(Direction.DOWN);
          } else {
            onDirectionChange(Direction.UP);
          }
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchend', handleTouchEnd);
  }, [onDirectionChange, disabled]);

  useEffect(() => {
    document.addEventListener('touchstart', handleTouchStart);
    return () => document.removeEventListener('touchstart', handleTouchStart);
  }, [handleTouchStart]);
};