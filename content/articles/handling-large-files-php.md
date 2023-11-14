---
layout: article.njk
title: Handling large files while avoiding memory shortages in PHP 
tags: article
date: 2005-12-22
hasCode: true
excerpt: ""
thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Webysther_20160423_-_Elephpant.svg/525px-Webysther_20160423_-_Elephpant.svg.png"
altText: "The PHP logo"
---
I've recently had to create a generic text data file uploader in PHP (namely to import tab-delimited fields into a database). After experiencing a few problems related to memory issues, I came up with a solution that might be of interest to some people. Here it is.

The idea is to parse the file chunk by chunk.
For example, let's say I have a 10 000 lines file that I'd like to parse. For each file I'm calling some database-related functions or so. As a result, each line can take quite some time to be processed and the whole loop can eventualy fail to finish due to limited memory or timeout.

So, what I do is I create a set of delimiters: m and n, m will be the line number to start from and n the maximum number of lines to read.

For example, if n=500 the first run would read from line m=0 to line m+n = 0+500.
Now 500 lines should be quite easy for PHP to parse even though each line needs quite a lot of processing.

Great, we've got our first 500 lines done, how do we process the rest now? Well, that's the main idea here, we need PHP to free its memory and reset its timeout, so what we do is simply reloading the page!!
header("Refresh: myscript.php?new_m_value=500&new_n_value=500");

Just call the same script again with different m and n values and you're on!
Of course, we'll need some variables to be carried accross, for that we have PHP sessions.
Now, enough text, let's see a little example of how I use this method:

```php
// Number of lines to parse in this run
$maxline = $_GET['max'] ? $_GET['max'] : 500;
// Offset line to start parsing from
$startline = $_GET['start'] ? $_GET['start'] : 1;
// Number of already parsed lines
$parsedlines = $_GET['aparsed'] ? $_GET['aparsed'] : 0;

// Is the parsing finished ?
$parsingdone = false;

// PHP session to pass variables from step to step
session_start();
if(!$_SESSION['dataFileReader'])
{
    $_SESSION['dataFileReader'] = $_POST;    // This is a bit brutal, but it's an example. just carry any variable you need ...
}

// File to work on
$temp_filename = $_SESSION['dataFileReader']['tempFileName'];

if(is_file($temp_filename))
{

    // Opening the data file
    if($handleReader = fopen($temp_filename, "r"))
    {
        // Counting the rows
        $count = 0;
        $parsed_count = 0;

        // Reading the file line by line with fgets function
        while(!feof($handleReader))
        {
            $buffer = fgets($handleReader, 4096);    // Reading one line
            $line = explode("\t", $buffer);        // Line is tab-delimited

            $count ++;
           
            // This is where I know which chunk of lines to process
            // This can be seen pretty much like the SQL clause: LIMIT m,n
            if(($count >= $startline) && ($count < $maxline + $startline))
            {
                foreach($line as $k=>$field)
                {
                     /* DO SOMETHING WITH THE FIELDS HERE */
                }

                $parsed_count ++;
           }
        }

        // Closing the file
        fclose($handleReader);
        
        // Here, we redirect or end the process
        if($parsed_count != 0)
        {
            // Redirecting to process the next part of the file
            header("Refresh: 1; script.php?start=".($startline+$maxline)."&max=".$maxline."&aparsed=".($parsedlines + $parsed_count));
        }
        else
        {
            // the parsing is done
            $parsingdone = true;
        }

        // Displaying number of lines parsed
        if(!$parsingdone)    echo ($parsedlines + $parsed_count)." lines parsed so far ... continuing ...";

        if($parsingdone)
        {
            // End message
            echo "Data file parsed (".($parsedlines + $parsed_count)." lines)!";

            // killing the session
            $_SESSION['dataFileReader'] = array();
            session_destroy();
        }

    }
    else
    {
        echo "ERROR: Couldn't open the data file - Nothing was uploaded";
    }

}
else
{
    echo "ERROR: Couldn't find the temporary data file - Nothing was uploaded";
}
```