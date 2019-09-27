import asyncio
import inspect

from functools import update_wrapper

def coro(f):
    """
    Decorator to run a co-routine into the default loop and exit.

    Note that this won't magically give you async. The co-routine will still lock,
    but it's a way to call co-routines from code that does not support asyncio.
    """
    if not inspect.iscoroutinefunction(f):
        f = asyncio.coroutine(f)

    def wrapper(*args, **kwargs):
        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
        return loop.run_until_complete(f(*args, **kwargs))
    return update_wrapper(wrapper, f)
