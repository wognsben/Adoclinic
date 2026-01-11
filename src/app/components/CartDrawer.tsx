import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';

export function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem } = useCart();

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-background border-l border-border z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-xl font-serif font-medium">Your Selection</h2>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
                  <span className="text-4xl">🛒</span>
                  <p>Your cart is empty.</p>
                  <Button variant="link" onClick={closeCart}>Browse Programs</Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item, index) => (
                    // Using index in key because we allow duplicates for now, 
                    // ideally should use unique ID per instance.
                    <motion.li 
                      key={`${item.id}-${index}`}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex gap-4 p-4 bg-secondary/50 rounded-lg border border-transparent hover:border-primary/20 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.price.toLocaleString()} KRW
                        </p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-secondary/10 space-y-4">
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>{total.toLocaleString()} KRW</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  * VAT not included. Payment is made at the clinic.
                </p>
                <Button className="w-full h-12 text-base" size="lg">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Request Reservation
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
