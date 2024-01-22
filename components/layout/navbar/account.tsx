import { SignedIn, SignedOut } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from 'components/ui/dropdown-menu';
import Link from 'next/link';
import SignOutButton from './sign-out';
export default function Account() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="ml-[2rem]">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>DJ</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* NAVIGATION */}
        <SignedIn>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </SignedIn>
        {/* LOGIN  */}
        <DropdownMenuItem>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
          <SignedOut>
            <Link href={'/sign-in'}>Login</Link>
          </SignedOut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
