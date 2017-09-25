import sys

def main():
  args = sys.argv[1:]
  print("hello world")

  if '--a' in args:
    print("you had a flag --a")

if __name__ == '__main__':
  main()