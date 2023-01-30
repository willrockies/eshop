import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "ui-gallery",
  templateUrl: "./gallery.component.html",
  styles: []
})
export class GalleryComponent implements OnInit {
  selectedImageUrl: string;
  @Input() images: string[];

  ngOnInit(): void {
    if (this.hasImage) {
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
  }

  get hasImage(){
    return this.images?.length > 0;
  }
}
