'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CalendarIcon, ClipboardPaste, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { useFormState, useFormStatus } from 'react-dom';
import { generateShortUrl } from '@/actions';
import { toast } from 'sonner';
import { Separator } from '../ui/separator';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';

const initialState = {
  message: null,
  url: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Create QuickLink
    </Button>
  );
}

export default function ShortenUrlForm() {
  const [urlInput, setUrlInput] = useState('');
  const [customNameInput, setCustomNameInput] = useState('');
  const [state, formAction] = useFormState<any, FormData>(
    generateShortUrl,
    initialState
  );

  const [urlExpiresSelect, setUrlExpiresSelect] = useState(false);
  const [urlExpirationDate, setUrlExpirationDate] = useState<Date>();

  function resetForm() {
    setCustomNameInput('');
    setUrlInput('');
    setUrlExpirationDate(undefined);
    setUrlExpiresSelect(false);
  }

  useEffect(() => {
    const message = state.message;

    if (message) toast.error(message);

    if (state.url) {
      navigator.clipboard.writeText(`${window.location.origin}/r/${state.url}`);
      toast.info('Quick Link copied!');
      resetForm();
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 rounded-md border-2 p-2"
    >
      <h1 className="text-center text-xl font-semibold">New QuickLink</h1>

      <div className="flex items-center gap-2">
        <div className="hidden lg:block">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={async () =>
                    setUrlInput(await navigator.clipboard.readText())
                  }
                >
                  <ClipboardPaste />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Paste URL from clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Input
          name="url"
          type="url"
          placeholder="https://example.com"
          required
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
      </div>

      <Separator className="mt-2" />

      <p className="my-1 px-2 font-semibold">Options</p>

      <div className="flex flex-col gap-3 px-2">
        <Input
          name="customName"
          type="text"
          minLength={2}
          maxLength={24}
          placeholder="Custom name. Leave blank for random."
          value={customNameInput}
          onChange={(e) => setCustomNameInput(e.target.value)}
        />

        <div className="flex items-center justify-between gap-5 rounded-lg bg-secondary/30 px-2 py-1">
          <div className="flex shrink-0 items-center space-x-2">
            <Checkbox
              id="expirationDateSelect"
              checked={urlExpiresSelect}
              onCheckedChange={(e) => setUrlExpiresSelect(Boolean(e.valueOf()))}
            />
            <Label htmlFor="expirationDateSelect">QuickLink expires?</Label>
          </div>

          <Popover>
            <PopoverTrigger
              asChild
              className={String(!urlExpiresSelect && 'invisible')}
            >
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !urlExpirationDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {urlExpirationDate ? (
                  format(urlExpirationDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                disabled={(date) => date < new Date()}
                selected={urlExpirationDate}
                onSelect={setUrlExpirationDate}
              />
            </PopoverContent>
          </Popover>

          <input
            className="hidden"
            name="expirationDate"
            value={urlExpirationDate?.toString()}
          />
        </div>
      </div>

      <Separator className="my-2" />

      <div className="flex justify-between gap-10">
        <SubmitButton />

        <Button
          variant="secondary"
          className="w-[50%]"
          type="button"
          onClick={resetForm}
        >
          Clear
        </Button>
      </div>
    </form>
  );
}
