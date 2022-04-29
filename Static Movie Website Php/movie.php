<!--
	Author: Drew Walizer 
	Date: 
	Course: 366
-->

<!DOCTYPE html>
<html lang="en">

<head>

	<title>Rancid Tomatoes</title>
	<link rel="icon" href="http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/rotten.gif" />

	<meta charset="utf-8" />
	<link href="movie.css" type="text/css" rel="stylesheet" />
</head>

<body>

	<!-- Getting file information --> 
	<?php
		$movie = $_GET["film"]; 
		$info = file("$movie/info.txt");
		$overview = file("$movie/overview.txt");
		$review_files = glob("$movie/review*.txt");
	?>

	<!-- the image running along the top -->
	<div id="banner">
		<img src="http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/banner.png" alt="Rancid Tomatoes">
	</div>

	<h1>
		<?= $info[0] ?> (<?= $info[1] ?>)
	</h1>

	<!-- Everything within the main center area -->
	<div id="content">

		<!-- right side of content. The tmnt pic and general overview section -->
		<div id="right">
			<div>
				<img src= <?= "$movie/overview.png" ?>
					alt="general overview">
			</div>

			<!-- general info -->
			<dl>
				<!-- Putting general info headings in an array and 
				the general info text for a heading in another array. -->
				<?php
				for($i = 0; $i < count($overview); $i++){
					$pos = strpos($overview[$i], ':');
					$heading[$i] = substr($overview[$i], 0, $pos);
					$general_info[$i] = substr($overview[$i], $pos + 1);	
				?>
				<div class="term">
					<dt> 
							<?= $heading[$i] ?>
					</dt>
					<dd>
							<?= $general_info[$i] ?>																										
					</dd>
					
				</div>
				<?php
				}
				?>

			<!-- end of general info -->
			</dl>
			<!-- end of right side of content -->
		</div>

		<!-- left side of content. The reivews and left top banner -->
		<div id="left">

			<!-- left top banner -->
			<div id="left-top">
				<?php
					// moive has rotten img if rating is under 60 
					// fresh img if rating is 60 or above  
					$rating = (int) $info[2];
					if($rating < 60) {
						$rating_img = "http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/rottenbig.png";
					}
					else {
						$rating_img = "http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/freshbig.png";
					}	 
				?>
				<img src= <?= $rating_img ?>  alt="Rotten">
				<?= $rating ?>%
			</div>

			<!-- The left review column -->
			<div id="left-col">
					
				<?php
					// Gets the first half of the reviews 
					for($i = 0; $i < ceil (count($review_files)/2); $i++){
						$review_text = file($review_files[$i]);
				?>

				<div class="review">
					<p class="review-quote">
						<img src=<?= review_image ($review_text[1]); ?>
							alt="Rotten">
						<q><?= trim($review_text[0]) ?></q>
					</p>
					<p class="reviewer">
						<img src="http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/critic.gif"
							alt="Critic">
						<?= $review_text[2] ?> <br>
						<?= $review_text[3] ?> 
					</p>
				</div>
				<?php
				}
				?>

				<!-- end of left review column -->
			</div>

			<!-- the right review column -->
			<div id="right-col">

				<?php
					// Gets the back half of the reviews 
					for($i = (ceil (count($review_files)/2)) ; $i < count($review_files); $i++){
						$review_text = file($review_files[$i]);
				?>
				
				<div class="review">
					<p class="review-quote">
						<img src=<?= review_image ($review_text[1]); ?>
							alt="Rotten">
						<q><?= trim($review_text[0]) ?></q>
					</p>
					<p class="reviewer">
						<img src="http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/critic.gif"
							alt="Critic">
						<?= $review_text[2] ?> <br>
						<?= $review_text[3] ?>
					</p>
				</div>	

				<?php 
					}
				?>
				<!-- end of the right review column -->
            </div>
            
			<!-- end of the left side content -->
		</div>

		<!-- bottom of content area 
			the number of reviews -->
		<div id="bottom">
			<p> (1 - <?= count($review_files) ?> ) of <?= count($review_files) ?> </p>
		</div>

		<!-- end of content area -->
	</div>

	<!-- html and css validators -->
	<div id="validators">
		<a href="http://validator.w3.org/check/referer"><img
				src="http://cs.millersville.edu/~sschwartz/366/Images/w3c-html.png" alt="Valid HTML5"></a>
		<br>
		<a href="http://jigsaw.w3.org/css-validator/check/referer"><img
				src="http://cs.millersville.edu/~sschwartz/366/Images/w3c-css.png" alt="Valid CSS"></a>
	</div>

</body>

</html>

<?php
	// checks to see if a reviewer gave a postive or negative review for their review quote img
	function review_image ($rating){
		$review_img = trim($rating);
		if($review_img == "FRESH") {
			$review_img = "http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/fresh.gif";
		}
		else {
			$review_img = "http://cs.millersville.edu/~sschwartz/366/HTML_CSS_Lab/Images/rotten.gif";
		}
		return $review_img; 
	}
?>