'use client';

import { useEffect, useState } from 'react';
import { Button, buttonVariants } from '../ui/button';
import { Input } from '../ui/input';
import { ClipboardCopy, ClipboardPaste, Loader2 } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { generateDemoShortUrl } from '@/actions';
import { toast } from 'sonner';
import ButtonTooltip from '../helpers/button-tooltip';

const initialState = {
  message: null,
  url: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Shorten it!
    </Button>
  );
}

export default function DemoShortenForm() {
  const [input, setInput] = useState('');
  const [state, formAction] = useFormState<any, FormData>(
    generateDemoShortUrl,
    initialState
  );

  useEffect(() => {
    const message = state.message;

    if (message) toast.error(message);

    if (state.url) {
      navigator.clipboard.writeText(`${window.location.origin}/r/${state.url}`);
      toast.info('Quick Link copied!');
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 rounded-md border-2 p-2"
    >
      <h1 className="text-center text-3xl font-semibold">Try it</h1>

      {!state.url ? (
        <div className="flex gap-1">
          <div className="flex w-full items-center gap-2">
            <div className="hidden lg:block">
              <ButtonTooltip info="Paste URL from clipboard">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={async () =>
                    setInput(await navigator.clipboard.readText())
                  }
                >
                  <ClipboardPaste />
                </Button>
              </ButtonTooltip>
            </div>

            <Input
              name="url"
              type="url"
              placeholder="https://example.com"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          <SubmitButton />
        </div>
      ) : (
        <div className="flex gap-1">
          <div
            className="flex w-full cursor-pointer items-center gap-2"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/r/${state.url}`
              );
              toast.info('Quick Link copied!');
            }}
          >
            <span
              className={buttonVariants({ variant: 'ghost', size: 'icon' })}
            >
              <ClipboardCopy />
            </span>
            <Input
              readOnly
              value={`${window.location.origin}/r/${state.url}`}
              className="cursor-pointer bg-secondary/30"
            />
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              state.url = null;
              setInput('');
            }}
          >
            Shorten more
          </Button>
        </div>
      )}

      <p className="text-sm text-foreground/75">
        This demo QuickLink will only be available for 1 week. Users can use
        custom names for QuickLinks.
      </p>
    </form>
  );
}
