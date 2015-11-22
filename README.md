## Installation

1. You will need to have [nodejs](https://nodejs.org/en/) installed
2. Clone the repository
  * `git clone git@github.com:HackTheDinos/csv-generator.git`
3. Change directory into the repository
  * `cd csv-generator`
4. Install the node modules
  * `npm install`

## Usage

To run `node index`

For help information `node index --help`

Help output
```
Usage: index [options]

Options:

  -h, --help          output usage information
  -i, --input <dir>   folder location of the images
  -o, --output <dir>  output location
  -r, --rotation <n>  degree of rotation of the source image
  -x, --sourcex <n>   x location of the section of the source image
  -y, --sourcey <n>   y location of the section of the source image
  -w, --sourcew <n>   width of the source image
  -h, --sourceh <n>   height of the source image
  -f, --force         force overwrite output file
```

## Example Commands

Images at `./images`, output to `./groups.csv`:

`node index`

Images at `../my/project/images`, output to `../my/project/output.csv`:

`node index -i ../my/project/images -o ../my/project/output.csv`

## Notes

If the `--rotation`, `--sourcex`, `--sourcey`, `--sourcew` or `--sourceh` flags are set,
they will be the same for every image in the processed folder.

The command will fail if the input **doesn't** exist, or the output **does** exist.
If you wish to overwrite the output, use the `-f` or `--force` flag.
